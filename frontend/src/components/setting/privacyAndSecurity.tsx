import { FC } from "react";

interface PrivacyAndSecurityProps {

}

const PrivacyAndSecurity: FC<PrivacyAndSecurityProps> = () => {
    return (
        <div className="w-full flex gap-5 items-center px-5 pb-3 bg-white shadow-[0_3px_3px_-2px_rgb(0,0,0,0.1)]">
            privacy and security
        </div>
    );
}

export default PrivacyAndSecurity;