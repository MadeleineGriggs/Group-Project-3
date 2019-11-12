// eslint-disable-next-line
import React from "react";
import { useState, useEffect } from "react";


export default function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {

        fetch(url)
            .then(response => response.json())
            .then(data => setData(data));
// eslint-disable-next-line
    }, []);
    return data;
}