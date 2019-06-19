import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import * as _ from 'lodash';

function tryGetElement<T extends HTMLElement = HTMLElement>(querySelector: string, filter?: (element: T ) => boolean){
    const elems = Array.from(document.querySelectorAll(querySelector).values()||[]);
    if(!elems || elems.length===0) {
        return undefined;
    }
   return filter? _.find(elems, (e: Element) => filter(e as T)) : _.first(elems);
  };

interface ElementExistsOptions {
    filter?: <T extends HTMLElement = HTMLElement>(element: T ) => boolean;
    maxAttempts: number;
    interval: number;
}

export function useElementExists <T extends HTMLElement=HTMLElement>(querySelector: string, {maxAttempts, interval,  filter}: ElementExistsOptions) {
    const [attempts, setAttempts] = useState(0);
    const [exists, setExists] = useState();
    const elemRef = useRef<T>();
    
    useEffect(() => {
        console.log('checking for', querySelector);
        const elem = tryGetElement(querySelector, filter);
        if(elem) {
            elemRef.current = (elem as T);
            setExists(true);
        } else if(attempts < maxAttempts) {
            setTimeout(() => {
                setAttempts(attempts+1);
            }, interval);
        } else {
            setExists(false);
        }
    }, [attempts, setAttempts, setExists]);
    const restart = useCallback(() => {setAttempts(0)}, [setAttempts]);
    return {exists, element: elemRef, restart};
}
// public tryRenderApp = (attempts: number = 0) => {
//     const rootElement = document.getElementById(this.containerKey);
//     console.debug(rootElement);
//     if (rootElement) {
//       this.render(rootElement);
//     } else if (attempts < 50) {
//       setTimeout(() => {
//         console.debug('trying again in 100 ms');
//         this.tryRenderApp(attempts + 1);
//       }, 100);
//     } else {
//       console.warn(`maximum attempts reached when trying to find element #${this.containerKey}`);
//     }
//   };