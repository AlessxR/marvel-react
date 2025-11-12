import React, {useEffect, useState} from "react";

import {useParams, Link} from "react-router-dom";

import './singleComicPage.scss';

import xMen from '../../resources/img/x-men.png';
import useMarvelService from "../../services/MarvelService.jsx";
import ErrorMessage from "../errorMessage/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";

const SingleComicPage = () => {

    // const something = useParams();
    //
    // console.log(something); // comicId: 2, если открыт 2 комикс

    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {error, loading, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComic(comicId).then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {

    const {title, description, pageCount, thumbnail, textObjects, prices} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {textObjects}</p>
                <div className="single-comic__price">{prices}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicPage;