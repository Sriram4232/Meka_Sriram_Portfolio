'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

// Create a soft glow texture programmatically
function createGlowTexture() {
    if (typeof document === 'undefined') return new THREE.Texture()
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const context = canvas.getContext('2d')
    if (context) {
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, 32, 32)
    }
    const texture = new THREE.CanvasTexture(canvas)
    return texture
}

function Flame() {
    const { viewport } = useThree()
    const count = 300
    const mesh = useRef<THREE.InstancedMesh>(null)
    const materialRef = useRef<THREE.MeshBasicMaterial>(null)
    const texture = useMemo(() => createGlowTexture(), [])
    const viewportRef = useRef(viewport)

    // Particle state
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
        return new Array(count).fill(0).map(() => ({
            x: 0,
            y: 0,
            z: 0,
            vx: 0,
            vy: 0,
            life: 0, // 0 to 1
            scale: 0,
            active: false
        }))
    }, [count])

    // Input state
    const mouse = useRef(new THREE.Vector2(0, 0))
    const lastMove = useRef(Date.now())
    const clickTime = useRef(0)

    // New state for handling touch vs mouse differentiation
    const inputMode = useRef<'mouse' | 'touch'>('mouse')
    const isTouching = useRef(false)

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            inputMode.current = 'mouse'
            lastMove.current = Date.now()
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                inputMode.current = 'touch'
                isTouching.current = true
                lastMove.current = Date.now()
                mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
                mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
            }
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                inputMode.current = 'touch'
                isTouching.current = true
                lastMove.current = Date.now()
                clickTime.current = Date.now()

                mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
                mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1

                if (!viewportRef.current) return
                const width = viewportRef.current.width
                const height = viewportRef.current.height

                const x = ((e.touches[0].clientX / window.innerWidth) * 2 - 1) * width / 2
                const y = (-(e.touches[0].clientY / window.innerHeight) * 2 + 1) * height / 2

                triggerBurst(x, y)
            }
        }

        const handleTouchEnd = () => {
            isTouching.current = false
        }

        const handleClick = (e: MouseEvent) => {
            // Ignore synthetic clicks from touch
            if (inputMode.current === 'touch') return

            inputMode.current = 'mouse'
            clickTime.current = Date.now()

            if (!viewportRef.current) return
            const width = viewportRef.current.width
            const height = viewportRef.current.height

            // Calculate accurate world position
            const x = ((e.clientX / window.innerWidth) * 2 - 1) * width / 2
            const y = (-(e.clientY / window.innerHeight) * 2 + 1) * height / 2

            triggerBurst(x, y)
        }

        const triggerBurst = (x: number, y: number) => {
            // Burst
            const burstCount = 30
            let spawned = 0
            for (let i = 0; i < particles.length; i++) {
                if (spawned >= burstCount) break
                const p = particles[i]
                if (!p.active) {
                    p.active = true
                    p.life = 1.0
                    p.x = x
                    p.y = y
                    p.z = 0
                    const angle = Math.random() * Math.PI * 2
                    const speed = 5 + Math.random() * 5
                    p.vx = Math.cos(angle) * speed
                    p.vy = Math.sin(angle) * speed
                    p.scale = 0.5 + Math.random() * 0.5
                    spawned++
                }
            }
        }

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('click', handleClick, { capture: true })
        window.addEventListener('touchmove', handleTouchMove, { passive: true })
        window.addEventListener('touchstart', handleTouchStart, { passive: true })
        window.addEventListener('touchend', handleTouchEnd)
        window.addEventListener('touchcancel', handleTouchEnd)

        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('click', handleClick, { capture: true })
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('touchend', handleTouchEnd)
            window.removeEventListener('touchcancel', handleTouchEnd)
        }
    }, [particles])

    useFrame((state, delta) => {
        if (!mesh.current) return
        viewportRef.current = state.viewport

        // Mouse follow
        const x = (mouse.current.x * state.viewport.width) / 2
        const y = (mouse.current.y * state.viewport.height) / 2

        // Color flash logic: Red for 150ms after click
        if (materialRef.current) {
            const timeSinceClick = Date.now() - clickTime.current
            if (timeSinceClick < 150) {
                materialRef.current.color.set('#ff0020') // Bright Red
            } else {
                materialRef.current.color.set('#ffffff') // White
            }
        }

        // Spawn new particles (Continuous) logic
        let shouldSpawn = false
        let spawnCount = 0

        if (inputMode.current === 'touch') {
            // Mobile: only spawn if actively touching
            shouldSpawn = isTouching.current
            spawnCount = 5
        } else {
            // Desktop: Spawn if moving recently
            const isIdle = Date.now() - lastMove.current > 500
            shouldSpawn = true // Always idle spawn a little on desktop? Or only move? 
            // Original logic: "isIdle ? 2 : 5" implies it ALWAYS spawns, just less when idle.
            // Let's keep that behavior for mouse.
            spawnCount = isIdle ? 2 : 5
        }

        if (shouldSpawn) {
            for (let i = 0; i < spawnCount; i++) {
                const p = particles.find(p => !p.active)
                if (p) {
                    p.active = true
                    p.life = 1.0
                    p.x = x + (Math.random() - 0.5) * 0.2
                    p.y = y + (Math.random() - 0.5) * 0.2
                    p.z = 0
                    p.vx = (Math.random() - 0.5) * 2
                    p.vy = 2 + Math.random() * 2
                    p.scale = 0.5 + Math.random() * 0.5
                }
            }
        }

        // Update particles
        particles.forEach((p, i) => {
            if (!p.active) {
                dummy.position.set(0, 0, 1000)
                dummy.scale.set(0, 0, 0)
                dummy.updateMatrix()
                mesh.current!.setMatrixAt(i, dummy.matrix)
                return
            }

            p.life -= delta * 2.5
            if (p.life <= 0) {
                p.active = false
                return
            }

            p.x += p.vx * delta
            p.y += p.vy * delta

            dummy.position.set(p.x, p.y, p.z)
            const currentScale = p.scale * p.life
            dummy.scale.set(currentScale, currentScale, currentScale)
            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })

        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                ref={materialRef}
                map={texture}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </instancedMesh>
    )
}

export default function FlameCursor() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <Canvas
                orthographic
                camera={{ zoom: 50, position: [0, 0, 100] }}
                gl={{ alpha: true }}
                style={{ pointerEvents: 'none' }}
            >
                <Flame />
            </Canvas>
        </div>
    )
}
