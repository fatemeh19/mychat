'use client'
import style from './style.module.css'

import { useState, createRef } from 'react'
import { BsFingerprint } from 'react-icons/bs'

import ListItem from '../listItem'
import Strength from './strength'

import '../../../../../public/font-awesome-4.7.0/css/font-awesome.css'
import Input from '../../input'


enum stateEnum {
    week = 'WEEK',
    moderate = 'MODERATE',
    strong = "STRONG"
}

export default function PasswordStrengthMeter({ name }: { name: string }) {

    const [show, setShow] = useState(false)
    const [state, setState] = useState<stateEnum>(stateEnum.week)

    // ref to ul
    const reqList = createRef<HTMLUListElement>()
    const reqBox = createRef<HTMLDivElement>()
    const strengthBox = createRef<HTMLDivElement>()


    const requirements = [
        { regex: /.{8,}/, index: 0, valid: false }, // Minimum of 8 characters
        { regex: /[0-9]/, index: 1, valid: false }, // At least one number
        { regex: /[a-z]/, index: 2, valid: false }, // At least one lowercase letter
        { regex: /[^A-Za-z0-9]/, index: 3, valid: false }, // At least one special character
        { regex: /[A-Z]/, index: 4, valid: false } // At least one uppercase letter
    ]

    const keyHandler = (e: any) => {
        // on key change show or hide : if input in empty hide and if there is something it show
        if (e.target.value === '') {
            //@ts-ignore
            reqBox.current.classList.remove(style.open)
            //@ts-ignore
            reqBox.current.classList.add(style.close)
        } else {
            //@ts-ignore
            reqBox.current.classList.add(style.open)
            //@ts-ignore
            reqBox.current.classList.remove(style.close)

            // reqBox.current.classList.remove('hidden')
        }
        // array for store li
        let requirement_li: any[] = [];
        // access to li from ul ref
        //@ts-ignore
        let object1 = reqList.current.childNodes;
        for (const [key, value] of Object.entries(object1)) {
            requirement_li.push(value.childNodes[1])
        }
        let count: number = 0;

        // loop on regex
        requirements.forEach(item => {
            // text input in regex
            const isValid = item.regex.test(e.target.value)
            // choose the requerment centence
            const requirementItem = requirement_li[item.index]
            // valid the centence
            if (isValid) {
                // access to icon : icon is previuse sibling
                // console.log(requirementItem.previousElementSibling)

                // remove circle icon
                requirementItem.previousElementSibling.classList.remove('fa-circle', 'fa-xs', 'text-gray-400')
                requirementItem.classList.remove('text-gray-500')

                // add check icon
                requirementItem.previousElementSibling.classList.add('fa-check', 'fa-sm', 'text-green-500')

                requirements[item.index].valid = true
                count++

            }
            else {
                // add circle icon
                requirementItem.previousElementSibling.classList.add('fa-circle', 'fa-xs', 'text-gray-400')
                requirementItem.classList.add('text-gray-500')

                // remove check icon
                requirementItem.previousElementSibling.classList.remove('fa-check', 'fa-sm', 'text-green-500')

                requirements[item.index].valid = false
                count--
            }
            switch (count) {
                case -3: //one sentence
                    setState(stateEnum.week)
                    break;
                case -1: //two
                    setState(stateEnum.week)
                    break;
                case 1: //three 
                    setState(stateEnum.moderate)
                    break;
                case 3: // four 
                    setState(stateEnum.moderate)
                    break;
                case 5: // five
                    setState(stateEnum.strong)
                    break;
                default:
                    setState(stateEnum.week)
                    break;
            }
        })

    }

    return (
        <div className='w-full rounded-lg'>
            <Input name="password" type={show ? 'text' : 'password'} label="password" icon={BsFingerprint} setShow={setShow} show={show} keyHandler={keyHandler}/>
            {/* 
            requirementBox hidden h-auto transition-all delay-200  */}
            <div className={`${style.close}`} ref={reqBox}>
                <div ref={strengthBox}>
                    {
                        state === stateEnum.week && <Strength text='WEEK' color='#f64f64' d='M16.408 2.823l-6.594 6.99 2.398 2.997L9 17l6.676-4.93-3.464-2.256 7.678-5.436c1.336.498 2.71.901 4.11 1.205A22.502 22.502 0 0 1 12.008 23.25 22.324 22.324 0 0 1 0 5.586 30.018 30.018 0 0 0 12.008 0a30.104 30.104 0 0 0 4.4 2.823z' />
                    }
                    {
                        state === stateEnum.moderate && <Strength text='MODERATE' color='#ff7e23' d='M21.761 7.088a32.064 32.064 0 0 1-9.753-4.606 32.018 32.018 0 0 1-9.775 4.612 20.322 20.322 0 0 0 9.769 13.875 20.5 20.5 0 0 0 9.76-13.881zM12.008 23.25A22.324 22.324 0 0 1 0 5.586 30.018 30.018 0 0 0 12.008 0 30.063 30.063 0 0 0 24 5.583 22.502 22.502 0 0 1 12.008 23.25z' />
                    }
                    {
                        state === stateEnum.strong && <Strength text='STRONG' color='#27be56' d='M12.008 23.25A22.324 22.324 0 0 1 0 5.586 30.018 30.018 0 0 0 12.008 0 30.063 30.063 0 0 0 24 5.583 22.502 22.502 0 0 1 12.008 23.25zM17 8.496L15.571 7l-5.102 5.342-2.04-2.137L7 11.701l3.47 3.632L17 8.496z' />
                    }
                </div>
                <div className='w-full border-b border-gray-200 my-7'></div>
                <div>
                    <p className='
                        font-[poppins]
                        mt-4
                    '>Password must contains</p>
                    <ul id='requirementList' ref={reqList}>
                        <ListItem
                            content='At least 8 characters length'
                        />
                        <ListItem
                            content='At least 1 number (0...9)'
                        />
                        <ListItem
                            content='At least 1 lowercase letter (a...z)'
                        />
                        <ListItem
                            content='At least 1 special symbol (!...$)'
                        />
                        <ListItem
                            content='At least 1 uppercase letter (A...Z)'
                        />
                    </ul>

                </div>

            </div>

        </div>
    )
}