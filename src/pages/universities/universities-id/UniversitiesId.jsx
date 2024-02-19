import React, {useEffect, useState} from 'react'
import UniCoun from "../../../components/university-country/UniCoun";
import {lang} from "../../../assets/scripts/global";
import $api from "../../../api/apiConfig";
import {useParams} from "react-router-dom";

const UniversitiesId = () => {

    const { id } = useParams()

    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get(`/university?where[name]=${id}`)
            .then(res => {
                setResult(res.data[0])
            })
    }, [id])


    return (
        <div className='universities-id'>
            <UniCoun
                id={id}
                result={result}
                univer={result?.country?.name}
                title={lang === 'ru' ? result?.nameRu : result?.name}
                desc={lang === 'ru' ? result.descRu : result.descEn}
                logo={result?.logo?.full_url}
                mainImg={result?.mainImg?.full_url}
                images={result.images}
                youtube={result.youtubeLink}
                universityId={result?.id}
                universityName={result?.name}
            />
        </div>
    )
}

export default UniversitiesId
