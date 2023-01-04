// helpers.spec.js

import {extractRootDomain, getDomainFromUrl, getDomainsFromUrl} from "@/components/url";

describe('url', () => {
    test('americanas', () => {
        expect(getDomainFromUrl("https://americanas.com.br")).toBe("americanas")
    })
    test('americanas', () => {
        expect(getDomainFromUrl("https://www.americanas.com.br")).toBe("americanas")
    })
    test('americanas', () => {
        expect(getDomainFromUrl("https://www.americanas.com")).toBe("americanas")
    })
    test('americanas', () => {
        expect(getDomainFromUrl("https://www.prefix.americanas.com")).toBe("americanas")
    })
    test('chrome://newtab/', () => {
        expect(getDomainFromUrl("chrome://newtab/")).toBe("chrome")
    })
    test('http://localhost:9099/', () => {
        expect(getDomainFromUrl("http://localhost:9099/")).toBe("localhost")
    })
    // http://localhost:9099/
    // chrome://newtab/
})

describe('urls', () => {
    test('test,americanas', () => {
        expect(getDomainsFromUrl("https://test.americanas.com.br")).toStrictEqual(["test", "americanas"])
    })
    test('test,americanas', () => {
        expect(getDomainsFromUrl("https://test.americanas.br")).toStrictEqual(["test", "americanas"])
    })
    test('americanas', () => {
        expect(getDomainsFromUrl("https://t.americanas.br")).toStrictEqual(["americanas"])
    })
    test('americanas', () => {
        expect(getDomainsFromUrl("https://americanas.com.br")).toStrictEqual(["americanas"])
    })
    //
    test('stackoverflow', () => {
        expect(getDomainsFromUrl("https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects")).toStrictEqual(["stackoverflow"])
    })
})


describe('extractRootDomain', () => {
    test('test,americanas', () => {
        expect(extractRootDomain("https://test.americanas.com.br")).toStrictEqual("test.americanas.com.br")
    })
    test('test,americanas', () => {
        expect(extractRootDomain("https://test.americanas.br")).toStrictEqual("test.americanas.br")
    })
    test('americanas', () => {
        expect(extractRootDomain("https://americanas.com.br")).toStrictEqual("americanas.com.br")
    })
    //
    test('stackoverflow', () => {
        expect(extractRootDomain("https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects")).toStrictEqual("stackoverflow.com")
    })
})