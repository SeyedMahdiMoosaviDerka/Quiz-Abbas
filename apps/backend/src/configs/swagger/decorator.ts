import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SW, keyOfSw } from './swagger-config';

export function ApiDocDecorator(endpoint: keyOfSw) {
  const { operation, responses } = SW[endpoint];
  return applyDecorators(
    ApiOperation(operation),
    ...responses // Spread the pre-constructed @ApiResponse decorators
  );
}
