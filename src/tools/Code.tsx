import React from 'react'
import useClipboard from './hooks/useClipboard'

const Code = (props: React.HTMLAttributes<HTMLElement>) => {
    const { copy } = useClipboard()

    const getInnerText = (obj: any) => {
        var buf = '';
        if (obj) {
            var type = typeof (obj);
            if (type === 'string' || type === 'number') {
                buf += obj;
            } else if (type === 'object') {
                var children = null;
                if (Array.isArray(obj)) {
                    children = obj;
                } else {
                    var props = obj.props;
                    if (props) {
                        children = props.children;
                    }
                }
                if (children) {
                    if (Array.isArray(children)) {
                        children.forEach(function (o) {
                            buf += getInnerText(o);
                        });
                    } else {
                        buf += getInnerText(children);
                    }
                }
            }
        }
        return buf;
    };

    const [isCopied, setCopied] = React.useState(false)

    const onCopy = (element: any) => {
        copy(getInnerText(element))
        setCopied(true)
        const timer = setTimeout(() => setCopied(false), 3000)
        return () => clearTimeout(timer)
    }

    return (
        <div className='code__block'>
            <pre>
                <code className={props.className}>
                    {props.children}
                </code>
            </pre>
            {!isCopied ? (
                <svg
                    className='__clipboard'
                    onClick={() => onCopy(props.children)}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                </svg>
            ) : (
                <svg className='__clipboard __copied' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <path d="M6.26193932,17.6476484 C5.90425297,18.0684559 5.27315905,18.1196257 4.85235158,17.7619393 C4.43154411,17.404253 4.38037434,16.773159 4.73806068,16.3523516 L13.2380607,6.35235158 C13.6013618,5.92493855 14.2451015,5.87991302 14.6643638,6.25259068 L19.1643638,10.2525907 C19.5771466,10.6195087 19.6143273,11.2515811 19.2474093,11.6643638 C18.8804913,12.0771466 18.2484189,12.1143273 17.8356362,11.7474093 L14.0997854,8.42665306 L6.26193932,17.6476484 Z" fill="currentColor" fillRule="nonzero" transform="translate(11.999995, 12.000002) rotate(-180.000000) translate(-11.999995, -12.000002) " />
                    </g>
                </svg>
            )}
        </div>
    )
}

export default Code