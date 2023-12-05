import React, {useEffect, useState} from 'react'
import $api from "../../api/apiConfig";
import {lang} from "../../assets/scripts/global";

const LangText = ({ txt }) => {

    const [result, setResult] = useState('')
    useEffect(() => {
        $api.get(`/static_option?where[key][like]=${txt}`)
            .then(res => setResult(res.data?.[0]?.[lang]))
    }, [txt])
    
    return result || txt
}

export default LangText
