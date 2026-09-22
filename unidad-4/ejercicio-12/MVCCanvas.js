class Model extends EventTarget
{
    constructor()
    {
        super();
        this._figures = [];
        this._options = { lineWidth: 2, lineCap: 'butt' };
    }

    get figures() { return this._figures; }
    get options() { return this._options; }

    addFigure(figure)
    {
        // Anexa los valores de los inputs al JSON de la figura
        let newFigure = { ...this._options, ...figure };
        this._figures.push(newFigure);
        this.changed();
    }

    clearFigures()
    {
        this._figures = [];
        this.changed();
    }

    setOption(key, value)
    {
        // Solo guarda el valor, NO redibuja las figuras existentes
        this._options[key] = value;
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
        this._canvas.height = 500;
        this._canvas.style.border = '1px solid black';

        this._controls = document.createElement('div');
        this._controls.style.marginTop = '10px';

        this._btnLoad = document.createElement('button');
        this._btnLoad.textContent = 'Cargar figura';
        this._btnLoad.addEventListener('click', () => this.dispatchEvent(new CustomEvent('request', { detail: 'load' })));

        this._btnClear = document.createElement('button');
        this._btnClear.textContent = 'Limpiar';
        this._btnClear.addEventListener('click', () => this.dispatchEvent(new CustomEvent('request', { detail: 'clear' })));

        this._controls.appendChild(this._btnLoad);
        this._controls.appendChild(this._btnClear);
    }

    addControl(element)
    {
        this._controls.appendChild(element);
    }

    render(renderFunction, model)
    {
        let ctx = this._canvas.getContext('2d');
        ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        renderFunction(this._canvas, model);
    }

    connectedCallback()
    {
        this.appendChild(this._canvas);
        this.appendChild(this._controls);
    }
}

customElements.define('x-view', View);

class Controller
{
    constructor(view, model, renderFunction = null)
    {
        this._view = view;
        this._model = model;
        this._renderFunction = renderFunction;
        this._onModelChanged = this.onModelChanged.bind(this);
        this._onViewRequest = this.onViewRequest.bind(this);
    }

    enable()
    {
        this._model.addEventListener('changed', this._onModelChanged);
        this._view.addEventListener('request', this._onViewRequest);
        this.onModelChanged();
    }

    onModelChanged()
    {
        let func = this._renderFunction || ejercicio6;
        this._view.render(func, this._model);
    }

    onViewRequest(event)
    {
        if (event.detail === 'load')
        {
            let json = prompt('JSON de la figura:');
            if (json)
            {
                try
                {
                    this._model.addFigure(JSON.parse(json));
                }
                catch (e)
                {
                    alert('JSON inválido');
                }
            }
        }
        else if (event.detail === 'clear')
        {
            this._model.clearFigures();
        }
        else if (event.detail.type === 'setOption')
        {
            this._model.setOption(event.detail.name, event.detail.value);
        }
    }
}