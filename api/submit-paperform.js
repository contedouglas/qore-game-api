export default async function handler(req, res) {
    // CORS - CRÍTICO!
    const allowedOrigins = ['https://qore.me', 'http://localhost:3000'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    
    // Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Só POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const gameData = req.body;
        
        const paperformData = {
            nome: gameData.playerName || '',
            playerEmail: gameData.playerEmail || '',
            empresaNome: gameData.empresaNome || '',
            empresaEmail: gameData.empresaEmail || '',
            quadrante: gameData.quadrant || '',
            principal: gameData.primaryStyle || '',
            secundario: gameData.secondaryStyle || '',
            FECAo: gameData.fecaOriginal || '',
            FECAf: gameData.fecaFinal || '',
            flexivel: gameData.scores?.flexivel || 0,
            estavel: gameData.scores?.estavel || 0,
            independente: gameData.scores?.independente || 0,
            interdependente: gameData.scores?.interdependente || 0,
            aprendizado: gameData.scores?.aprendizado || 0,
            prazer: gameData.scores?.prazer || 0,
            proposito: gameData.scores?.proposito || 0,
            acolhimento: gameData.scores?.acolhimento || 0,
            ordem: gameData.scores?.ordem || 0,
            seguranca: gameData.scores?.seguranca || 0,
            autoridade: gameData.scores?.autoridade || 0,
            resultado: gameData.scores?.resultado || 0
        };

        const paperformResponse = await fetch('https://api.paperform.co/v1/forms/mupzzmug/submit', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNWUzMTY4Yjk1YzYwNzYwYTc5YTJjYThhNzE1ZjM5NTAzNGJlYWUwYzIyMzg1NmNiZDYxMzc4NzhiZGVjNmI3YzFkZGM4YTVjMzM0ZjlkMTEiLCJpYXQiOjE3NjMzODc3NTUuMTIwMTQsIm5iZiI6MTc2MzM4Nzc1NS4xMjAxNDMsImV4cCI6NDkxOTA2MTM1NS4xMTM5NjcsInN1YiI6IjEyNTE0OCIsInNjb3BlcyI6W119.wKz3W6f1W_H-MkQT7HXxkZtt0VsMcCTf-E0guXLSh2179u94NAha6FswjmT790GXRrjQiEqtPSvuq41AmeCYSOYX5RkFRKXVojVV6YyMV7d3R3ZpEGlTCe-eZsLkDZtAZGpHZLgnBZGE94wVR_oDwY5IOWIt734nlm193hR4vGlKNS0W6lhsM-99JawvNQylmrNok91ymLe-C9eX_5OU91zzlNxinzVZCK2S0_A2TeKB9N8CtKHDM158AjstkRM8v0MLtQv4uft0bCKYUJIzfNG2Mx-A3cGBp79llSUZRSEHIRV8PJ92tWvqeC5eRSrtnvEkpglPOe2SWcEGE6R-ipxThLN6PjcyInqRnBoQlyntHXNrvEPdja6mDTxFCYiqrCPpn5YcqQrwwuOaGYD5FIMS6Nme3XNi0UaGViHCZthCtiOKr3ipuF7vDuYkkSZ979Yx2KxU7OF73P-CaSnMufD5TQ2OMhav21pRAo3XabycgEumquWv_hfUxkPUYIsQ31RxvTEAMSU3vSkjodm7Q3YyRzc-yEUFixSrCGoalpSqJel7vpMRbM5dE-6JO4_Y5_Tg_CxvzJ6FXSGer56NG2V553wy_m-KnJCLua5PtpcDpPlKh-WZzNDKfVVqCEXkoQ8l1tdyzhaHBKx8z_J-_ZbCJ9G8rxfyoOxynOcmqmA',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paperformData)
        });

        const responseText = await paperformResponse.text();
        
        console.log('Paperform Status:', paperformResponse.status);
        console.log('Paperform Response:', responseText.substring(0, 500));

        if (!paperformResponse.ok) {
            return res.status(200).json({ 
                success: false, 
                error: `Paperform retornou ${paperformResponse.status}`,
                details: responseText.substring(0, 300)
            });
        }

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            result = { message: 'Enviado', raw: responseText.substring(0, 100) };
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Dados enviados ao Paperform',
            data: result 
        });

    } catch (error) {
        console.error('Erro geral:', error);
        return res.status(200).json({ 
            success: false, 
            error: error.message,
            stack: error.stack?.substring(0, 300)
        });
    }
}
