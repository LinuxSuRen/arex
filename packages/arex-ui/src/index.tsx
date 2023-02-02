import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
// import ss from ''
// import './index.css'
import * as js  from 'arex-rs/arex_rs_bg.wasm'

const App = ()=>{
    useEffect(() => {
        ;(async () => {
            try {
                const wasm = await import('arex-rs/arex_rs_bg.wasm')
                const greeting = wasm.add_two(123)
                console.log(greeting)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])
    return <div>123</div>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
