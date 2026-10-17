function ejercicio19(canvas, model)
{
    let ctx = canvas.getContext('2d');
    let figures = model.figures;

    for (let i = 0; i < figures.length; i++)
    {
        let figure = figures[i];

        ctx.lineWidth = figure.lineWidth || 2;
        ctx.lineCap = figure.lineCap || 'butt';

        switch (figure.type)
        {
            case 'circle':
                ctx.beginPath();
                ctx.arc(figure.x, figure.y, figure.radius, 0, 2 * Math.PI);
                ctx.stroke();
                break;

            case 'polygon':
                ctx.beginPath();
                let points = figure.points;
                for (let j = 0; j < points.length; j++)
                {
                    let px = figure.x + points[j][0];
                    let py = figure.y + points[j][1];
                    
                    if (j === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.stroke();
                break;

            case 'cake':
                drawCake(ctx, figure);
                break;
        }
    }
}

function drawCake(ctx, figure)
{
    let total = figure.data.reduce((sum, val) => sum + val, 0);
    let startAngle = 0;

    for (let i = 0; i < figure.data.length; i++)
    {
        let sliceAngle = (figure.data[i] / total) * 2 * Math.PI;
        let endAngle = startAngle + sliceAngle;

        ctx.fillStyle = getRandomColor();

        ctx.beginPath();
        ctx.moveTo(figure.x, figure.y);
        ctx.arc(figure.x, figure.y, figure.radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        startAngle = endAngle;
    }
}

function getRandomColor()
{
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++)
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}