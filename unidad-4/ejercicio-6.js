function ejercicio6(canvas, model)
{
    var ctx = canvas.getContext('2d');
    var figures = model.figures;

    for (var i = 0; i < figures.length; i++)
    {
        var figure = figures[i];
        ctx.beginPath();
        
        if (figure.type === 'circle')
        {
            ctx.arc(figure.x, figure.y, figure.radius, 0, 2 * Math.PI);
        }
        else if (figure.type === 'polygon')
        {
            var points = figure.points;
            for (var j = 0; j < points.length; j++)
            {
                var px = figure.x + points[j][0];
                var py = figure.y + points[j][1];
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
        }
        
        ctx.stroke();
    }
}