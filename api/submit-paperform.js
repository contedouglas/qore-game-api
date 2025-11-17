export default async function handler(req, res) {
    // Permitir CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Responder preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Só aceita POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const gameData = req.body;

    try {
        const paperformData = {
            nome: gameData.playerName,
            playerEmail: gameData.playerEmail,
            empresaNome: gameData.empresaNome,
            empresaEmail: gameData.empresaEmail,
            quadrante: gameData.quadrant,
            principal: gameData.primaryStyle,
            secundario: gameData.secondaryStyle,
            FECAo: gameData.fecaOriginal,
            FECAf: gameData.fecaFinal,
            flexivel: gameData.scores.flexivel,
            estavel: gameData.scores.estavel,
            independente: gameData.scores.independente,
            interdependente: gameData.scores.interdependente,
            aprendizado: gameData.scores.aprendizado,
            prazer: gameData.scores.prazer,
            proposito: gameData.scores.proposito,
            acolhimento: gameData.scores.acolhimento,
            ordem: gameData.scores.ordem,
            seguranca: gameData.scores.seguranca,
            autoridade: gameData.scores.autoridade,
            resultado: gameData.scores.resultado
        };

        const response = await fetch('https://api.paperform.co/v1/forms/mupzzmug/submit', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNWUzMTY4Yjk1YzYwNzYwYTc5YTJjYThhNzE1ZjM5NTAzNGJlYWUwYzIyMzg1NmNiZDYxMzc4NzhiZGVjNmI3YzFkZGM4YTVjMzM0ZjlkMTEiLCJpYXQiOjE3NjMzODc3NTUuMTIwMTQsIm5iZiI6MTc2MzM4Nzc1NS4xMjAxNDMsImV4cCI6NDkxOTA2MTM1NS4xMTM5NjcsInN1YiI6IjEyNTE0OCIsInNjb3BlcyI6W119.wKz3W6f1W_H-MkQT7HXxkZtt0VsMcCTf-E0guXLSh2179u94NAha6FswjmT790GXRrjQiEqtPSvuq41AmeCYSOYX5RkFRKXVojVV6YyMV7d3R3ZpEGlTCe-eZsLkDZtAZGpHZLgnBZGE94wVR_oDwY5IOWIt734nlm193hR4vGlKNS0W6lhsM-99JawvNQylmrNok91ymLe-C9eX_5OU91zzlNxinzVZCK2S0_A2TeKB9N8CtKHDM158AjstkRM8v0MLtQv4uft0bCKYUJIzfNG2Mx-A3cGBp79llSUZRSEHIRV8PJ92tWvqeC5eRSrtnvEkpglPOe2SWcEGE6R-ipxThLN6PjcyInqRnBoQlyntHXNrvEPdja6mDTxFCYiqrCPpn5YcqQrwwuOaGYD5FIMS6Nme3XNi0UaGViHCZthCtiOKr3ipuF7vDuYkkSZ979Yx2KxU7OF7
