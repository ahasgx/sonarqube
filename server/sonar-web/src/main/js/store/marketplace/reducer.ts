/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { Action } from './actions';
import { PluginPendingResult } from '../../api/plugins';

interface State {
  currentEdition?: string;
  pending: PluginPendingResult;
}

const defaultState: State = { pending: { installing: [], removing: [], updating: [] } };

export default function(state: State = defaultState, action: Action): State {
  if (action.type === 'SET_PENDING_PLUGINS') {
    return {
      ...state,
      pending: action.pending
    };
  }
  if (action.type === 'SET_CURRENT_EDITION') {
    return {
      ...state,
      currentEdition: action.currentEdition
    };
  }
  return state;
}

export const getCurrentEdition = (state: State) => state.currentEdition;
export const getPendingPlugins = (state: State) => state.pending;
