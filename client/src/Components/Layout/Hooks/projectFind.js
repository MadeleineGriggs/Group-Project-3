// eslint-disable-next-line
import React from "react";
import { useState, useEffect } from "react";


export default function useFetchProject(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => data.map(obj => ({...obj, checked: false})))
            .then(data => setData(data))
    // eslint-disable-next-line
    }, []);
    return [data, setData];
}