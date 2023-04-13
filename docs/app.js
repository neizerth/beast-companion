(async () => {
    const onload = () => new Promise((resolve) => {
        if (document.readyState === 'complete') {
            resolve();
        }
        document.addEventListener('DOMContentLoaded', function listener(e) {
           document.removeEventListener(e.type, listener);
           resolve();
        });
    });

    const initMapControls = () => {
        const buttons = [...document.querySelectorAll('.control__select-map')];
        buttons.forEach(btn =>
            btn.addEventListener('click', () => onMapSelect(btn.dataset.size))
        )
    };

    const init = () => {
        initMapControls();
    };

    class GameMap {
        static FULL_WIDTH = 1544;
        static FULL_HEIGHT = 964;
        constructor(size) {
            this.size = size;
            this.element = document.querySelector('.map');
            this.container = this.element.querySelector('.map__container')
        }
        async init() {
            await this.renderImage();
            console.log('map loaded');
            this.data = await this.fetchData();
            console.log('locations loaded');
            this.renderLocations();
        }
        update() {

        }
        renderLocations() {
            const locations = this.data.slice(1);
            for (let id in locations) {
                const point = locations[id];
                this.renderLocation(id + 1, point);
            }
        }
        renderLocation(id, data) {
            const defaultSize = this.getLocationSize();
            const [top, left,,size = defaultSize] = data;
            const [x, y] = this.getLocationCoordinates(left, top);

            const mapLocation = document.createElement('div');
            mapLocation.classList.add('map__location');
            Object.assign(mapLocation.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px'
            });
            mapLocation.dataset.index = id;
            this.container.append(mapLocation);

            mapLocation.addEventListener('click', this.onLocationSelect.bind(this));
        }
        onLocationSelect(e) {
            const mapLocation = e.target;
            mapLocation.classList.toggle('map__location_selected')
        }
        getLocationSize() {
            return this.data[0] * this.k;
        }
        getLocationCoordinates(x, y) {
            return [x * this.k, y * this.k];
        }
        getLocation
        async fetchData() {
            const url = `data/map_${this.size}.json`;
            const response = await fetch(url);
            return await response.json();
        }

        getMapUrl() {
            return `img/map_${this.size}.png`;
        }

        async renderImage() {
            const img = new Image;

            img.src = this.getMapUrl();
            img.classList.add('hidden');
            await new Promise((resolve, reject) => {
                img.addEventListener('load', resolve);
                img.addEventListener('error', reject);
            });

            img.classList.remove('hidden');
            img.classList.add('map__image');

            const nodes = [...this.container.children]
            this.container.append(img);
            nodes.forEach(node => node.remove());

            this.mapImage = img;

            const { innerWidth, innerHeight } = window;
            const { FULL_HEIGHT, FULL_WIDTH } = this.constructor;

            const height = innerHeight;
            const k = innerHeight / FULL_HEIGHT;
            const width = k * FULL_WIDTH;

            this.container.style.height = height + 'px';
            this.container.style.width = width + 'px';

            this.k = k;
        }

        remove() {

        }
    }

    const onMapSelect = async size => {
        document.querySelector('.controls').remove();
        map = new GameMap(size);
        await map.init();
    };

    let map;
    console.log('initializing application')
    await onload();
    console.log('DOM Loaded');
    init();
})();