import Header from "./Header"
import Footer from "./Footer"
import MainBody from "./MainBody"
import { useState } from "react"
import SelectedMovie from "./SelectedMovie"

export default function MainPage(){

    const [string, setString] = useState("")
    const [selected , setSelected] = useState("")

    return(
        <>
        <Header setString = {setString} />
        <MainBody string = {string} selected = {selected} setSelected= {setSelected} />
        <Footer />
        </>
    )
}