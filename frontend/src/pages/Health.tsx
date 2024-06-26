import axios from 'axios';
import { useState } from 'react';

export default function Health() {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="flex flex-col text-center p-10 gap-5">
            <div>
                <button className="p-3 border-2 rounded-md border-black bg-slate-200" onClick={handleClick}>
                    백엔드와 프론트 통신하기
                </button>
            </div>
            <div>콘솔에 결과가 출력됩니다.</div>
            {isSuccess ? <div className="text-green-500 font-bold">🎉🎉 통신 성공 🎉🎉</div> : null}
        </div>
    );

    async function handleClick() {
        const { REACT_APP_NEST_BASE_URL: NEST_BASE_URL = '' } = window._ENV ?? process.env;

        try {
            const res = await axios.get(`${NEST_BASE_URL}/health`);
            console.log(res);

            setIsSuccess(true);
        } catch (err) {
            console.error(err);

            setIsSuccess(false);
        }
    }
}
