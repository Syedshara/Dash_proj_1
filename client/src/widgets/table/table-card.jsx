import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, Button, Input, IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const OverlayCard = ({ rowData, onClose, onSave }) => {
    const [editedData, setEditedData] = useState({ ...rowData });

    const handleChange = (e, key) => {
        setEditedData({ ...editedData, [key]: e.target.value });
    };

    const handleBackgroundClick = (e) => {
        if (e.target.id === "overlay-background") {
            onClose();
        }
    };

    return (
        <div
            id="overlay-background"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
            onClick={handleBackgroundClick}
        >
            <Card className="relative w-96 p-4 bg-white shadow-lg rounded-lg" onClick={(e) => e.stopPropagation()}>

                <CardHeader color="gray" className="p-4 text-white" floated={true}>
                    <Typography variant="h6">Edit Row Details</Typography>
                </CardHeader>

                <CardBody>
                    {Object.entries(editedData).map(([key, value]) => (
                        <div key={key} className="mb-3">
                            <Input
                                value={value}
                                label={key}
                                onChange={(e) => handleChange(e, key)}
                                className="border border-gray-300 px-2 py-1 rounded-md w-full"
                            />
                        </div>
                    ))}

                    {/* Single Update Button */}
                    <Button color="green" className="w-full mt-4" onClick={() => onSave(editedData)}>
                        Update
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default OverlayCard;
