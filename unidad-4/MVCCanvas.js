class Model extends EventTarget
{
    constructor()
    {
        super();
        this._figures = [];
    }
    get figures()
    {
        return this._figures;
    }
    addFigure(figure)
    {
        this._figures.push(figure);
        this.changed();
    }
    clearFigures()
    {
        this._figures = [];
        this.changed();
    }
    changed()
    {
        this.dispatchEvent(new CustomEvent('changed'));
    }
}

class View extends HTMLElement
{
    constructor()
    {
        super();
        this._canvas = document.createElement('canvas');
        this._canvas.width = 800;
        this._canvas.height = 600;
        this._canvas.style.border = '1px solid black';
        this.ctx = this._canvas.getContext('2d');
        this.appendChild(this._canvas);

        this._btnLoad = document.createElement('button');
        this._btnLoad.textContent = 'Cargar figura';
        this._btnLoad.addEventListener('click', this._onLoadClick.bind(this));

        this._btnClear = document.createElement('button');
        this._btnClear.textContent = 'Limpiar';
        this._btnClear.addEventListener('click', this._onClearClick.bind(this));

        this.appendChild(this._btnLoad);
        this.appendChild(this._btnClear);
    }

    _onLoadClick()
    {
        this.dispatchEvent(new CustomEvent('request', { detail: 'load' }));
    }

    _onClearClick()
    {
        this.dispatchEvent(new CustomEvent('request', { detail: 'clear' }));
    }

    render(renderFunction, model)
    {
        this.clear();
        renderFunction(this._canvas, model);
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    connectedCallback()
    {
        console.log('Canvas agregado...');
    }
    disconnectedCallback()
    {
    }
    _onSave()
    {
    }
}
customElements.define('x-view', View);

class Controller
{
    constructor(view, model)
    {
        this._view = view;
        this._model = model;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onViewRequest = this.onViewRequest.bind(this);
    }
    enable()
    {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.addEventListener('request', this._onViewRequest);
    }
    disable()
    {
        this._model.removeEventListener('changed', this._onModelChanged);
        this._view.removeEventListener('request', this._onViewRequest);
    }
    onModelChanged()
    {
        this._view.render(ejercicio6, this._model);
    }
    onViewRequest(event)
    {
        if (event.detail === 'load')
        {
            var json = prompt('Ingrese el JSON de la figura:');
            if (json)
            {
                try
                {
                    var figure = JSON.parse(json);
                    this._model.addFigure(figure);
                }
                catch (e)
                {
                    alert('JSON inválido: ' + e.message);
                }
            }
        }
        else if (event.detail === 'clear')
        {
            this._model.clearFigures();
        }
    }
}