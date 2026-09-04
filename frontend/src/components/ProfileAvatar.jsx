import React, { useEffect, useState } from 'react';

const DEFAULT_PHOTO_SRC = '/profile.jpg';
const DEFAULT_PHOTO_WEBP = '/profile.webp';

const ProfileAvatar = ({ size = 'md', className = '', src }) => {
    const [imgFailed, setImgFailed] = useState(false);
    const photoSrc = src || DEFAULT_PHOTO_SRC;
    // The pre-generated WebP variant only exists for the bundled static
    // photo — an admin-uploaded photo comes straight from the backend as
    // whatever format it was uploaded in, so there's no WebP to offer it.
    const isStaticPhoto = !src;

    useEffect(() => {
        setImgFailed(false);
    }, [photoSrc]);

    const sizes = {
        sm: 'h-32 w-32 text-3xl sm:h-40 sm:w-40 sm:text-4xl',
        md: 'w-60 h-72 sm:w-68 sm:h-80 text-5xl sm:text-6xl rounded-3xl',
        lg: 'h-36 w-36 text-4xl sm:h-44 sm:w-44 sm:text-5xl',
    };

    const isRounded = size !== 'md';
    const objectPosition = isRounded ? 'center 15%' : 'center 10%';
    const imgProps = {
        alt: 'Muhammad Qasim',
        onError: () => setImgFailed(true),
        className: 'h-full w-full object-cover',
        style: { objectPosition },
        loading: 'eager',
    };

    return (
        <div
            className={`profile-avatar relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-blue-900 font-bold text-white shadow-[0_0_40px_rgba(56, 189, 248,0.35)] ${isRounded ? 'rounded-full border-4 border-blue-500/60' : 'border-2 border-blue-500/30'} ${sizes[size]} ${className}`}
        >
            {!imgFailed ? (
                isStaticPhoto ? (
                    <picture key={photoSrc}>
                        <source srcSet={DEFAULT_PHOTO_WEBP} type="image/webp" />
                        <img src={photoSrc} {...imgProps} />
                    </picture>
                ) : (
                    <img key={photoSrc} src={photoSrc} {...imgProps} />
                )
            ) : (
                <span aria-label="Muhammad Qasim">MQ</span>
            )}
        </div>
    );
};

export default ProfileAvatar;
