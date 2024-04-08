const postData = async (url, data) => {  //(async)codul asincron din functie va fi transformat in sincron
    const res = await fetch(url, {  //(avait), se foloseste cu async, js intelege ca codul ce urmeaza va fi sincron
        method: "POST",  //Indicam metoda
        headers: {  //Indicam titlurile
            'Content-type': 'application/json'
        },
        body: data
    });  //In res punem promisul ce vine de la fetch
    return await res.json();  //transforma raspunsul in json
};

async function getResource(url) {  //(async)codul asincron din functie va fi transformat in sincron
    let res = await fetch(url);  //In res punem promisul ce vine de la fetch

    if (!res.ok) {  //daca res nu este ok
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);  //Aruncam o noua eroare
    }

    return await res.json();  //transforma raspunsul in json
};


export {postData};
export{getResource};

