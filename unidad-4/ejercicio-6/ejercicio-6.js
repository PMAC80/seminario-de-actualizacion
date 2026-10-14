function ejercicio6(canvas, model)
{
    let ctx = canvas.getContext('2d');
    let figures = model.figures;

for (let i = 0; i < figures.length; i++)
    {
        let figure = figures[i];
        ctx.beginPath();

        switch (figure.type)
        {
            case 'circle':
                ctx.arc(figure.x, figure.y, figure.radius, 0, 2 * Math.PI);
                break;

            case 'polygon':
                let points = figure.points;
                for (let j = 0; j < points.length; j++)
                {
                    let px = figure.x + points[j][0];
                    let py = figure.y + points[j][1];

                    if (j === 0)
                    {
                        ctx.moveTo(px, py);
                    }
                    else
                    {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.closePath();
                break;
                
            default:
                console.warn('Tipo de figura desconocido:', figure.type);
        }

        ctx.stroke();
    }
}