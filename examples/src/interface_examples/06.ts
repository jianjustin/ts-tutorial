(
    function Control() {
        class Control {
            protected state: any;
        }
        
        interface SelectableControl extends Control {
            select(): void;
        }
        
        class Button extends Control implements SelectableControl {
            select() {
                console.log("Button selected", this.state);
             }
        }
        
        class TextBox extends Control {
        
        }
    }

    
)()