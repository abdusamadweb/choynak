import React, {useEffect, useState} from 'react'
import UniCoun from "../../../components/university-country/UniCoun";
import {useParams} from "react-router-dom";
import $api from "../../../api/apiConfig";
import {lang} from "../../../assets/scripts/global";

const CountriesId = () => {


    const { id } = useParams()

    const [result, setResult] = useState([])
    useEffect(() => {
        $api
            .get(`/countries?where[name]=${id}`)
            .then(res => {
                setResult(res.data[0])
            })
    }, [id])


    return (
        <div className='countries-id'>
            <UniCoun
                id={id}
                univer={false}
                title={result?.name}
                desc={lang === 'ru' ? result.descRu : result.descEn}
                logo={result?.logo?.full_url}
                mainImg={result?.mainImg?.full_url}
                images={result.images}
                youtube={result.youtubeLink}
                intake1={result.intakes}
                intake2={result.partnerUniversities}
                intake3={result.annualFees}
                intake4={result.internationalStudents}
                intake5={result.monthlyLivingCosts}
            />
        </div>
    )
}

export default CountriesId
