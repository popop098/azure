module.exports.fetch = async function(url, options = {}){
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
}

module.exports.fetcher = (url,option={}) => fetch(url,option).then((res) => res.json());
