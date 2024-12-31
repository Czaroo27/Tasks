import React from 'react';

export default function NoPockets() {
    return (
        <React.Fragment>
            <div className="flex flex-col justify-center items-center h-full text-center w-full bg-gray-200">
                <div className="text-2xl mb-4">No Pockets Available</div>
                <div className="text-lg">
                    Please create a new pocket or select an existing pocket from the sidebar.
                </div>
            </div>
        </React.Fragment>
    );
}