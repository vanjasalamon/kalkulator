import { createSignal } from "solid-js";
import "./Calculator.css";
import money from "./assets/money.png";

export default function Calculator() {
    const [dug, setDug] = createSignal(0);
    const [kamate, setKamate] = createSignal(0);
    const [mjesecniDoplatak, setMjesecniDoplatak] = createSignal(0);
    const [mjeseci, setMjeseci] = createSignal(0);
    const [error, setError] = createSignal('');

    const izracunajMjesece = () => {
        setError('');

        if (dug() <= 0) {
            setError('Iznos duga mora biti veći od 0.');
            return;
        }
        if (dug() >= 9999999999) {
            setError('Iznos duga je prevelik.');
            return;
        }
        if (kamate() < 0) {
            setError('Kamatna stopa ne može biti negativna.');
            return;
        }
        if (kamate() > 20) {
            setError('Kamatna stopa je prevelika.');
            return;
        }
        if (mjesecniDoplatak() <= 0) {
            setError('Mjesečni doplatak mora biti veći od 0.');
            return;
        }
        if (mjesecniDoplatak() >= 9999999999) {
            setError('Iznos mjesečnog doplatka je prevelik.');
            return;
        }

        let preostaliDug = dug();
        const K = (kamate() / 100) / 12;
        const M = mjesecniDoplatak();
        let n = 0;

        if (M <= preostaliDug * K) {
            setMjeseci(null); 
            setError('Mjesečni doplatak nije dovoljan za pokriće kamata.');
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
                <img src={money} alt="money" width="150" height="150" />
                <h1>Kalkulator otplate duga</h1>
                <label>
                    Iznos duga u eurima: 
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
                {error() && <p style={{ color: 'red' }}>{error()}</p>}
                {mjeseci() === null ? (
                    <p>Mjesečni doplatak nije dovoljan za pokriće kamata.</p>
                ) : (
                    <p>Broj mjeseci potrebnih za isplatu duga: {mjeseci()}</p>
                )}
            </div>
        </>
    );
}