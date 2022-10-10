import 'module-alias/register';
import { addAliases } from 'module-alias';
import { join } from 'path';

addAliases({
  '@Controllers': join(__dirname, 'controllers'),
  '@Shared': join(__dirname, 'shared'),
  '@Config': join(__dirname, 'config'),
  '@Database': join(__dirname, 'infrastructure', 'database'),
});
