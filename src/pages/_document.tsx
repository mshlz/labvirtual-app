import Document, { Head, Html, Main, NextScript } from 'next/document'

class LabAppDocument extends Document {
    render() {
        return <>
            <Html>
                <Head>
                    <link href="/assets/css/font-face.css" rel="stylesheet" media="all" />
                    <link href="/vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all" />

                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossOrigin="anonymous" />
                    {/* <link href="/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all" /> */}

                    <link href="/vendor/animsition/animsition.min.css" rel="stylesheet" media="all" />
                    {/* <link href="/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all" /> */}
                    <link href="/vendor/wow/animate.css" rel="stylesheet" media="all" />
                    <link href="/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/slick/slick.css" rel="stylesheet" media="all" />
                    <link href="/vendor/select2/select2.min.css" rel="stylesheet" media="all" />
                    <link href="/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all" />
                    <link href="/vendor/circle-porcentage/css/circle.css" rel="stylesheet" media="all" />

                    <link href="/assets/css/main.css" rel="stylesheet" media="all" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="/vendor/jquery-3.2.1.min.js"></script>
                    <script src="/vendor/bootstrap-4.1/popper.min.js"></script>
                    <script src="/vendor/bootstrap-4.1/bootstrap.min.js"></script>
                    <script src="/vendor/slick/slick.min.js"></script>
                    <script src="/vendor/wow/wow.min.js"></script>
                    <script src="/vendor/animsition/animsition.min.js"></script>
                    {/* <script src="/vendor/bootstrap-progressbar/bootstrap-progressbar.min.js"></script> */}
                    {/* <script src="/vendor/counter-up/jquery.waypoints.min.js"></script> */}
                    {/* <script src="/vendor/counter-up/jquery.counterup.min.js"></script> */}
                    {/* <script src="/vendor/circle-progress/circle-progress.min.js"></script> */}
                    <script src="/vendor/perfect-scrollbar/perfect-scrollbar.js"></script>
                    {/* <script src="/vendor/chartjs/Chart.bundle.min.js"></script> */}
                    <script src="/vendor/select2/select2.min.js"></script>
                    <script src="/assets/js/main.js"></script>

                </body>
            </Html>
        </>
    }
}

export default LabAppDocument