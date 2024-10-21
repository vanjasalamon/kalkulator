import { createSignal } from "solid-js"


export default function Calculator(){
    const Calculator = () => {
        const [dug, setDug] = createSignal(0);
        const [kamate, setKamate] = createSignal(0);
        const [mjesecniDoplatak, setMjesecniDoplatak] = createSignal(0);
        const [mjeseci, setMjeseci] = createSignal(0);

        const izracunajMjesece = () => {
            const D = dug();
            const K = kamate() / 100 / 12;
            const M = mjesecniDoplatak();

            if (M <= D * K){
                setMjeseci(-1);
                return;
            }

            const n = Math.ceil(math.log(1 - (K * D) / M) / Math.log(1 + K));
            setMjeseci(n);

        };
    };

    return(
        <div></div>
    );

    

}