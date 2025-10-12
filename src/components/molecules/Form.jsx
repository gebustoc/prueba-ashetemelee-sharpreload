import React from "react";
import { Input } from "../atoms/Input";
import { Form } from "react-bootstrap";

function DynamicForm({inputs = []}) {
    return (
        // la wea mandaba como 39021392 errores si se dejaba como controlID|
        <Form>
            {inputs.map((input, index) => (
                <Form.Group key={input.id || index} id={`input-${input.id || index}`}>
                    {input.label && <Form.Label>{input.label}</Form.Label>}
                    <Input {...input} />
                    {input.error && <Form.Text className="text-danger">{input.error}</Form.Text>}
                </Form.Group>
            ))}
        </Form>
    )
}

export default DynamicForm;