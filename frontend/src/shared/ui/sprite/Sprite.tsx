export const Sprite = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="visually-hidden">
            <symbol id="icon-search" viewBox="0 0 24 24" fill="none">
                <path
                    d="M17 17L21 21"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    strokeWidth="2"
                />
            </symbol>
            <svg id="icon-plus" viewBox="0 0 448 512">
                <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z" />
            </svg>
            {/* <svg id="icon-plus" viewBox="-2.1 -2.1 25.20 25.20">
                <g
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m5.5 10.5h10"></path>
                    <path d="m10.5 5.5v10"></path>
                </g>
            </svg> */}
        </svg>
    );
};
