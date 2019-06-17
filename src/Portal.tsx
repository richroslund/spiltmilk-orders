import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export const Portal: React.FunctionComponent<{ containerSelector: string; timeout?: number, optional?: boolean }> = ({
    children,
    containerSelector,
    timeout,
    optional,
}) => {
    const container = useRef<Element>();
    const elem = useRef<HTMLDivElement>(document.createElement('div'));
    const [containerExists, setContainerExists] = useState(false);

    useEffect(() => {
        const tryLoad = async () => {
            try {
                const containerElem = await tryLoadContainer(containerSelector, timeout || 250, 10);
                if (containerElem) {
                    container.current = containerElem;
                }
                setContainerExists(true);
            }
            catch (err) {
                if (optional) {
                    console.warn(err);
                } else {
                    throw err;
                }
            } finally {
            }
        };
        tryLoad();
    }, [containerSelector, containerExists]);

    useEffect(() => {
        if (containerExists && container && container.current) {
            container.current.appendChild(elem.current);
            return () => {
                if (container && container.current) {
                    container.current.removeChild(elem.current);
                }
            };
        }
    }, [container, containerExists]);
    return ReactDOM.createPortal(children, elem.current);
};

const tryLoadContainer = async (key: string, timeout: number, maxAttempts: number, attempt: number = 0) =>
    new Promise<Element>((resolve, reject) => {
        const elem = document.querySelector(key);
        if (elem) {
            resolve(elem);
        } else if (attempt < maxAttempts) {
            return setTimeout(() => {
                resolve(tryLoadContainer(key, timeout, maxAttempts, attempt + 1));
            }, timeout);
        } else {
            reject(`maximum attempts reached when trying to find element #${key}`);
        }
    });

