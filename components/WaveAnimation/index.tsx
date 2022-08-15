import style from './index.module.css'
import { useEffect, useState } from 'react'

class Point {
    private value: number
    private target: number
    private reached: boolean
    private step: number
    constructor(step: number) {
        this.value = 9 + Math.random() * 4
        this.target = 9 + Math.random() * 4
        this.reached = false
        this.step = step
    }
    public makeStep(): number {
        if (this.reached) {
            this.target = 9 + Math.random() * 4
            this.reached = false
        }
        if (this.value > this.target) {
            this.value -= this.step
            if (this.value < this.target) {
                this.reached = true
            }
        } else {
            this.value += this.step
            if (this.value > this.target) {
                this.reached = true
            }
        }
        return this.value
    }
}

export default function WaveAnimation() {
    const fps: number = 60
    const step: number = 0.01
    const [targetArray] = useState([
        new Point(step),
        new Point(step),
        new Point(step),
        new Point(step),
        new Point(step),
        new Point(step),
        new Point(step),
        new Point(step),
    ])
    const [waveString, setWaveString] = useState<string>('')
    useEffect(() => {
        const currentString: string = `M 20 0 V 30 H ${targetArray[0].makeStep()} C ${targetArray[1].makeStep()} 28 ${targetArray[2].makeStep()} 25 ${targetArray[3].makeStep()} 20 S ${targetArray[4].makeStep()} 14 ${targetArray[5].makeStep()} 10 S ${targetArray[6].makeStep()} 4 ${targetArray[7].makeStep()} 0 Z`
        const renderTimeout = setTimeout(() => {
            setWaveString(currentString)
        }, 1000 / fps)
        return function () {
            clearTimeout(renderTimeout)
        }
    }, [waveString])
    return (
        <svg className={style.backGroundWave} viewBox="0 0 20 30">
            <path d={waveString} fill="url(#gradient)" />
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                        offset="0%"
                        style={{
                            stopColor: 'rgba(0,212,255,0.6)',
                            stopOpacity: 0,
                        }}
                    />
                    <stop
                        offset="100%"
                        style={{
                            stopColor: 'rgba(13, 213, 255, 1)',
                            stopOpacity: 1,
                        }}
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}
