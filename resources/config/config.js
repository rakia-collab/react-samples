(function () {
    const front = 'https://dl.dxp.delivery/MOVWAPP1';
    //const back = 'https://dl.dxp.delivery/BOVWAPP1';

    //const front = 'https://front.cassiopae.com/FrontV4FOINNO3';
    // const back = 'https://back.cassiopae.com/CassiopaeBOINNO3';

    const apis = {
        master: {
            hostname: front,
            api: front + '/RestServices'
        },
      //  back: {
      //      hostname: back,
      //      api: back + '/RestServices',
      //  },
    };

    window.cassioPosConfig = {
        apis: apis,
        masterApi: 'master', // api which manage session and userconfiguration
        offline: false // Does not support offline in this demo application
    };
})();
