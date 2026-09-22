function ejercicio12(canvas, model)
{
    let ctx = canvas.getContext('2d');
    let figures = model.figures;

    for (let i = 0; i < figures.length; i++)
    {
        let figure = figures[i];

        ctx.lineWidth = figure.lineWidth || 2;
        ctx.lineCap = figure.lineCap || 'butt';

        ctx.beginPath();

        if (figure.type === 'circle')
        {
            ctx.arc(figure.x, figure.y, figure.radius, 0, 2 * Math.PI);
        }
        else if (figure.type === 'polygon')
        {
            let points = figure.points;
            for (let j = 0; j < points.length; j++)
            {
                let px = figure.x + points[j][0];
                let py = figure.y + points[j][1];
                
                if (j === 0) { ctx.moveTo(px, py); }
                else { ctx.lineTo(px, py); }
            }
            
            if (points.length > 2) { ctx.closePath(); }
        }

        ctx.stroke();
    }
}