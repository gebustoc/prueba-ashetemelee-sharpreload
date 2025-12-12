import React from "react";
import { Input } from "../atoms/Input"; 
import { Form } from "react-bootstrap";

function DynamicForm({inputs = []}) {
    return (
        <Form>
            {inputs.map((input, index) => {
                const controlId = `input-${input.id || index}`;
                const { id: originalId, error: inputError, ...restInputProps } = input; 
                return (
                    <Form.Group className="mb-3" key={input.id || index} controlId={controlId}>
                        
                        {input.label && <Form.Label>{input.label}</Form.Label>}
                        
                        {input.type === 'select' ? (
                            <Form.Select
                                id={controlId} 
                                value={input.value}
                                onChange={input.onChange}
                                isInvalid={!!inputError} 
                            >
                                <option value="">Seleccione una opción...</option>
                                {(input.options || []).map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.nombre || option.descripcion || "Opción"} 
                                    </option>
                                ))}
                            </Form.Select>
                        ) : (
                            <Input 
                                id={controlId} 
                                isInvalid={!!inputError} 
                                {...restInputProps} 
                            /> 
                        )}

                        {input.error && <Form.Text className="text-danger">{input.error}</Form.Text>}
                    </Form.Group>
                );
            })}
        </Form>
    )
}

export default DynamicForm;