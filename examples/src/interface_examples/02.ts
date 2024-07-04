(
    function syntax() { 
        interface IPoint3D {
            x: number;
            y: number;
        }

        let p: IPoint3D = { x: 5, y: 5 };

        console.log(`Coordinates: ${p.x}, ${p.y}`);
    }
)();