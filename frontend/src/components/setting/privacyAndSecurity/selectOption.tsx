import { privacyOption } from "@/src/models/enum";
import { useAppSelector } from "@/src/redux/hooks";
import { FC, useState } from "react";

interface SelectOptionProps {
    value: privacyOption,
    privacyStateHandler: (value: any) => void
}

const SelectOption: FC<SelectOptionProps> = ({ value, privacyStateHandler }) => {
    const [selected, setSetselected] = useState<privacyOption>(value)

    const OptionChangeHandler = (e: any) => {
        setSetselected(e.target.value)
        privacyStateHandler(e.target.value)
    }

    return (
        <div className="p-5 flex flex-col gap-2">
            <div className="flex gap-2">
                <input type="radio" name="privacyOption" id="everybody" value={privacyOption.everybody} checked={selected === privacyOption.everybody} onChange={OptionChangeHandler} />
                <label htmlFor="everybody">Everybody</label>
            </div>
            <div className="flex gap-2">
                <input type="radio" name="privacyOption" id="myContacts" value={privacyOption.myContacts} checked={selected === privacyOption.myContacts} onChange={OptionChangeHandler} />
                <label htmlFor="everybody">My contacts</label>
            </div>
            <div className="flex gap-2">
                <input type="radio" name="privacyOption" id="nobody" value={privacyOption.nobody} checked={selected === privacyOption.nobody} onChange={OptionChangeHandler} />
                <label htmlFor="everybody">Nobody</label>
            </div>
        </div>
    );
}

export default SelectOption;