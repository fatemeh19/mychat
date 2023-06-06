"use client"

import style from './style.module.css'

export default function DateLine({ date }: { date: string }) {

    return (
        <div className={style.line}>
            <div>
                <span className={style.spacer}></span>
                <h1>{date}</h1>
                <span className={style.spacer}></span>
            </div>
        </div>
    )
}
