
export const extractRootDomain = (url:string) => {
    let hostname = new URL(url).hostname
    hostname = hostname.replace('www.', '')
    return hostname
}

function getDomains(url:string):string{
    if (!url){
        return ''
    }
    if (!url.startsWith("https://")){
        return ''
    }
    url = url.substring(8)
    if (url.startsWith("www.")){
        url = url.substring(4)
    }
    return url.split("/")[0]
}

export function getDomainFromUrl(url: string): string {
    if (url.startsWith("chrome")){
        return 'chrome'
    }
    if (url.includes("localhost")){
        return 'localhost'
    }
    const path = getDomains(url)
    const domainSpl = path.split(".")
    if (domainSpl[domainSpl.length-2] === 'com'){
        return domainSpl[domainSpl.length-3]
    }
    return domainSpl[domainSpl.length-2]
}

export function getDomainsFromUrl(url: string): string[] {
    const path = getDomains(url)
    let domainSpl = path.split(".")
    domainSpl.pop()
    domainSpl = domainSpl.filter((x:string) => x !== 'com')
    domainSpl = domainSpl.filter((x:string) => x.length > 1)

    return domainSpl
}
