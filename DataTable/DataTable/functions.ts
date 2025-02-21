export const getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<Record<string, unknown>> {
    const outputObjectSchema: JSONSchema4 = {
        $schema: 'http://json-schema.org/draft-04/schema#',
        title: 'outputObject',
        type: 'object',
        properties: this.columnProperties || this.getInputSchema(context),
    };

    return Promise.resolve({
        outputObject: outputObjectSchema,
    });
}