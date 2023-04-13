(async () => {
    const onload = () => new Promise((resolve) => {
        function check() {
            console.log('readyState', document.readyState);
            if (document.readyState === 'complete') {
                return run();
            }
            setTimeout(check, 100);
        }
        check();
        const run = e => {
            document.removeEventListener('DOMContentLoaded', run);
            resolve();
        };
        document.addEventListener('DOMContentLoaded', run);
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
            this.container = this.element.querySelector('.map__container');
            this.locations = [];
            this.data = [];

            this.onLocationSelect = this.onLocationSelect.bind(this)
        }
        async init() {
            await this.renderImage();
            console.log('map loaded');
            this.data = await this.fetchData();
            console.log('locations loaded');
            this.renderLocations();
        }
        resize() {
            const { width,height,k } = this.getSize();

            this.k = k;
            this.container.style.height = height + 'px';
            this.container.style.width = width + 'px';

            this.renderLocations();
        }
        renderLocations() {
            const locations = this.data.slice(1);
            for (let id in locations) {
                const point = locations[id];
                this.renderLocation(id + 1, point);
            }
        }
        renderLocation(id, data) {
            const size = this.getLocationSize(data[3]);
            const [top, left] = data;
            const [x, y] = this.getLocationCoordinates(left, top);

            let mapLocation= this.locations.find(item => item.dataset.index === id);
            const exists = Boolean(mapLocation);

            if (!exists) {
                mapLocation = document.createElement('div');
                mapLocation.classList.add('map__location');
            }

            Object.assign(mapLocation.style, {
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px'
            });

            if (exists) {
                return;
            }

            mapLocation.dataset.index = id;
            this.container.append(mapLocation);
            this.locations.push(mapLocation);

            mapLocation.addEventListener('click', this.onLocationSelect);
        }
        onLocationSelect(e) {
            const mapLocation = e.target;
            mapLocation.classList.toggle('map__location_selected')
        }
        getLocationSize(size) {
            const defaultSize = this.data[0];
            return (size || defaultSize) * this.k;
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
            this.resize()
        }
        getSize() {
            const { innerWidth, innerHeight } = window;
            const { FULL_HEIGHT, FULL_WIDTH } = this.constructor;

            let height = innerHeight;
            let k = height / FULL_HEIGHT;
            let width = k * FULL_WIDTH;

            if (width > innerWidth) {
                width = innerWidth;
                k = width / FULL_WIDTH;
                height = k * FULL_HEIGHT;
            }

            return { width, height, k };
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
    window.addEventListener('resize', () => map.resize());
})();