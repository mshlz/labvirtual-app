import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Loading = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    return loading && (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffffcc',
            zIndex: 400,
            transition: 'all .4s ease'
        }}>
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: '48px' }} />}
                tip={"Carregando..."}
            />
        </div>
    );
}
