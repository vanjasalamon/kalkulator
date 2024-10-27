import { createSignal } from "solid-js";
import "./Calculator.css";

export default function Calculator() {
    const [dug, setDug] = createSignal(0);
    const [kamate, setKamate] = createSignal(0);
    const [mjesecniDoplatak, setMjesecniDoplatak] = createSignal(0);
    const [mjeseci, setMjeseci] = createSignal(0);

    const izracunajMjesece = () => {
        let preostaliDug = dug();
        const K = (kamate() / 100) / 12;
        const M = mjesecniDoplatak();
        let n = 0;

        if (M <= preostaliDug * K) {
            setMjeseci(null); 
            return;
        }

        while (preostaliDug > 0) {
            preostaliDug = preostaliDug * (1 + K) - M;
            n += 1;
        }

        setMjeseci(n);
    };

    return (
        <>
            <div>
                <h1>Kalkulator otplate duga</h1>
                <label>
                    Iznos duga: 
                    <input type="number" value={dug()} onInput={(e) => setDug(+e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Kamatna stopa (% godišnje): 
                    <input type="number" value={kamate()} onInput={(e) => setKamate(+e.currentTarget.value)} />
                </label>
                <br />
                <label>
                    Mjesečni doplatak: 
                    <input type="number" value={mjesecniDoplatak()} onInput={(e) => setMjesecniDoplatak(+e.currentTarget.value)} />
                </label>
                <br />
                <button onClick={izracunajMjesece}>Izračunaj mjesece</button>
                <br />
                {mjeseci() === null ? (
                    <p>Mjesečni doplatak nije dovoljan za pokriće kamata.</p>
                ) : (
                    <p>Broj mjeseci potrebnih za isplatu duga: {mjeseci()}</p>
                )}
            </div>
        </>
    );
}