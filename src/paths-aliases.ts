import 'module-alias/register';
import { addAliases } from 'module-alias';
import { join } from 'path';

addAliases({
  '@Controllers': join(__dirname, 'controllers'),
  '@Shared': join(__dirname, 'shared'),
  '@Config': join(__dirname, 'config'),
  '@Database': join(__dirname, 'infrastructure', 'database'),
  '@Interfaces': join(__dirname, 'core', 'interfaces'),
  '@Services': join(__dirname, 'core', 'services'),
  '@Repositories': join(__dirname, 'infrastruture', 'repositories'),
});
