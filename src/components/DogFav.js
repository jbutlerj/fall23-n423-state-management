import React from "react";
import { Popup, Image, Grid, Button } from "semantic-ui-react";

export default function DogFav({ src, children, onClick }) {
    return (
        <>
            <Grid.Column>
                <Popup
                    trigger={<Image src={src} />}
                    on="click"
                    content={
                        <Button
                            color="green"
                            icon="info circle"
                            content={children || "More Info"}
                            onClick={onClick}
                        />
                    }
                />
            </Grid.Column>
        </>
    );
}
